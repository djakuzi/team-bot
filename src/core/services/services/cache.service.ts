import { Injectable } from '@nestjs/common';
import { Memory } from '@tb-core/libs/memory/index.lib';

interface CacheRecord<T> {
	value: T;
	expiresAt?: number;
} 

@Injectable()
export class ServiceCache {
	private store = new Map<string, CacheRecord<any>>();
	private memory: number | null = null;

	constructor() {
		setInterval(() => this.cleanup(), 300000);
	}

	set<T>(key: string, value: T, ttlMs?: number): void {
		const expiresAt = ttlMs ? Date.now() + ttlMs : undefined;
		this.store.set(key, { value, expiresAt });

		this.memory = null;
	}

	get<T>(key: string): T | null {
		const record = this.store.get(key);
		if (!record) return null;

		if (record.expiresAt && record.expiresAt < Date.now()) {
			this.store.delete(key);
			return null;
		}

		return record.value as T;
	}

	has(key: string): boolean {
		const record = this.store.get(key);
		if (!record) return false;

		if (record.expiresAt && record.expiresAt < Date.now()) {
			this.store.delete(key);
			return false;
		}

		return true;
	}

	delete(key: string): void {
		this.store.delete(key);

		this.memory = null;
	}

	clear(): void {
		this.store.clear();
		this.memory = null;
	}

	private cleanup(): void {
		const now = Date.now();

		for (const [key, record] of this.store.entries()) {
			if (record.expiresAt && record.expiresAt < now) {
				this.store.delete(key);
			}
		}

		this.memory = null;
	}

	getCacheSizeMbValuesOnly(): number {
		if (this.memory) {
			return this.memory;
		}
		
		let totalBytes = 0;

		for (const record of this.store.values()) {
			totalBytes += Memory.calc(record.value);
		}

		return totalBytes / (1024 * 1024);
	}
}
