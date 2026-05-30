const ICON_SIZE = 32;
const ICON_CHANNELS = 4;

function setPixel(
    pixels: Uint8Array,
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a = 255
) {
    if (x < 0 || x >= ICON_SIZE || y < 0 || y >= ICON_SIZE) {
        return;
    }

    const offset = (y * ICON_SIZE + x) * ICON_CHANNELS;
    pixels[offset] = b;
    pixels[offset + 1] = g;
    pixels[offset + 2] = r;
    pixels[offset + 3] = a;
}

function createFavicon() {
    const pixels = new Uint8Array(ICON_SIZE * ICON_SIZE * ICON_CHANNELS);

    for (let y = 0; y < ICON_SIZE; y += 1) {
        for (let x = 0; x < ICON_SIZE; x += 1) {
            const inset = x >= 2 && x <= 29 && y >= 2 && y <= 29;
            const edge =
                (x < 4 && y < 4) ||
                (x > 27 && y < 4) ||
                (x < 4 && y > 27) ||
                (x > 27 && y > 27);
            setPixel(pixels, x, y, inset && !edge ? 12 : 0, inset && !edge ? 12 : 0, inset && !edge ? 12 : 0);
        }
    }

    const centerX = 14.5;
    const centerY = 15.5;
    for (let y = 0; y < ICON_SIZE; y += 1) {
        for (let x = 0; x < ICON_SIZE; x += 1) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance >= 7.2 && distance <= 10.2) {
                setPixel(pixels, x, y, 34, 197, 94);
            }
        }
    }

    for (let y = 21; y <= 24; y += 1) {
        for (let x = 23; x <= 26; x += 1) {
            setPixel(pixels, x, y, 34, 197, 94);
        }
    }

    const maskRowBytes = ICON_SIZE / 8;
    const imageBytes = 40 + pixels.length + maskRowBytes * ICON_SIZE;
    const bytes = new Uint8Array(6 + 16 + imageBytes);
    const view = new DataView(bytes.buffer);

    view.setUint16(2, 1, true);
    view.setUint16(4, 1, true);
    bytes[6] = ICON_SIZE;
    bytes[7] = ICON_SIZE;
    view.setUint16(10, 1, true);
    view.setUint16(12, 32, true);
    view.setUint32(14, imageBytes, true);
    view.setUint32(18, 22, true);

    const bitmapOffset = 22;
    view.setUint32(bitmapOffset, 40, true);
    view.setInt32(bitmapOffset + 4, ICON_SIZE, true);
    view.setInt32(bitmapOffset + 8, ICON_SIZE * 2, true);
    view.setUint16(bitmapOffset + 12, 1, true);
    view.setUint16(bitmapOffset + 14, 32, true);
    view.setUint32(bitmapOffset + 20, pixels.length, true);

    const pixelOffset = bitmapOffset + 40;
    for (let y = 0; y < ICON_SIZE; y += 1) {
        const sourceY = ICON_SIZE - 1 - y;
        const sourceOffset = sourceY * ICON_SIZE * ICON_CHANNELS;
        const targetOffset = pixelOffset + y * ICON_SIZE * ICON_CHANNELS;
        bytes.set(pixels.subarray(sourceOffset, sourceOffset + ICON_SIZE * ICON_CHANNELS), targetOffset);
    }

    return bytes;
}

export const dynamic = "force-static";

export function GET() {
    return new Response(createFavicon(), {
        headers: {
            "Content-Type": "image/x-icon",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
