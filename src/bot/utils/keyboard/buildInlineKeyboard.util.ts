type InlineKeyboardButton = {
  text: string;
  callback_data: string;
};

type ButtonConfig = {
  action: string;
  desc: string;
};

interface KeyboardConfig {
  buttons: Record<string, ButtonConfig>;
  layout?: number | number[];
  fallbackRowSize?: number;
  excludeKeys?: string[];
  excludeValues?: ButtonConfig[];
  additionalButtons?: ButtonConfig[];
  placeAdditionalButtons?: 'start' | 'end';
}

export function buildInlineKeyboard(
  config: KeyboardConfig,
): InlineKeyboardButton[][] {
  const {
    buttons,
    layout,
    fallbackRowSize = 2,
    excludeKeys = [],
    excludeValues = [],
    additionalButtons = [],
    placeAdditionalButtons = 'start',
  } = config;

  const excludeActions = new Set(excludeValues.map(v => v.action));

  const keys = Object.keys(buttons).filter(
    key =>
      !excludeKeys.includes(key) && !excludeActions.has(buttons[key].action),
  );

  const mainButtons: ButtonConfig[] = keys.map(key => buttons[key]);

  let allButtons: ButtonConfig[];

  if (placeAdditionalButtons === 'start') {
    allButtons = [...additionalButtons, ...mainButtons];
  } else {
    allButtons = [...mainButtons, ...additionalButtons];
  }

  const result: InlineKeyboardButton[][] = [];

  function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  if (!layout) {
    result.push(
      allButtons.map(btn => ({
        text: btn.desc,
        callback_data: btn.action,
      })),
    );
  } else if (typeof layout === 'number') {
    const chunks = chunkArray(allButtons, layout);

    for (const chunk of chunks) {
      result.push(
        chunk.map(btn => ({
          text: btn.desc,
          callback_data: btn.action,
        })),
      );
    }
  } else if (Array.isArray(layout)) {
    let cursor = 0;
    for (const rowSize of layout) {
      const slice = allButtons.slice(cursor, cursor + rowSize);
      if (slice.length === 0) break;
      result.push(
        slice.map(btn => ({
          text: btn.desc,
          callback_data: btn.action,
        })),
      );
      cursor += rowSize;
    }

    if (cursor < allButtons.length) {
      const rest = allButtons.slice(cursor);
      const restChunks = chunkArray(rest, fallbackRowSize);

      for (const chunk of restChunks) {
        result.push(
          chunk.map(btn => ({
            text: btn.desc,
            callback_data: btn.action,
          })),
        );
      }
    }
  }

  return result;
}
