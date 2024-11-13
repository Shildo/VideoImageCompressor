export default async function compressVideoDTO(video, format) {
	const allowedFormats = ['mov', 'avi', 'mp4', 'webm', 'ogg'];

	if (!allowedFormats.includes(format))
		return { valid: false, error: 'Format is not supported for video compression.' }

	if (video.type && !allowedFormats.includes(video.type.split('/')[1]))
		return { valid: false, error: 'Video type is not supported for compression.' }

	if (!video || video.size === 0)
		return { valid: false, error: 'Uploaded file is invalid or empty.' };

	return { valid: true };
}