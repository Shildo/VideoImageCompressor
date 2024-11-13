import sharp from "sharp";

export default async function compressImage(image, format, quality) {
	try {
		let img = sharp(image.buffer);

		img = img.toFormat(format, {
			quality: quality,
			effort: 6,
		});

		const compressedImage = await img.toBuffer();

		return { ok: true, compressedImage };
	} catch (error) {
		return { ok: false, error: 'Error during image compression.' }
	}
}