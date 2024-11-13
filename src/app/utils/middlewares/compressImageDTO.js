export default async function compressImageDTO(image, format, quality) {
	const allowedFormats = ['avif', 'jpeg', 'jpg', 'jpe', 'png', 'webp'];

	if (!allowedFormats.includes(format))
		return { valid: false, error: 'Format is not supported for image compression.' };
	if (!allowedFormats.includes(image.type.split('/')[1]))
		return { valid: false, error: 'Image type is not supported for compression.' };

	if (!/^\d+$/.test(quality))
		return { valid: false, error: 'Quality must be a valid integer.' };

	const parsedQuality = parseInt(quality);
	if (parsedQuality < 1 || parsedQuality > 100)
		return { valid: false, error: 'Quality has to be an integer between 1 and 100.' };

	if (!image.buffer || image.buffer.length === 0)
		return { valid: false, error: 'Uploaded file is invalid or empty.' };

	return { valid: true };
}
