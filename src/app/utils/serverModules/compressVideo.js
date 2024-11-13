import Ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";

export default async function compressVideo(video, format) {
	return new Promise((resolve, reject) => {
		const passThroughStream = new PassThrough();
		const ffmpegCommand = Ffmpeg(video.path);

		const codecMap = {
			mp4: { videoCodec: 'libx264' },
			mov: { videoCodec: 'libx264' },
			avi: { videoCodec: 'mpeg4' },
			webm: { videoCodec: 'libvpx', audioCodec: 'libvorbis' },
			ogg: { videoCodec: 'libtheora' },
		};

		const codecs = codecMap[format];

		if (codecs.audioCodec) ffmpegCommand.audioCodec(codecs.audioCodec);

		if (format === 'mp4' || format === 'mov')
			ffmpegCommand.outputOptions('-movflags', 'frag_keyframe+empty_moov');

		ffmpegCommand
			.videoCodec(codecs.videoCodec)
			.toFormat(format)
			.on('end', () => resolve(passThroughStream))
			.on('error', (error) => reject(error))
			.pipe(passThroughStream, { end: true });
	});
}
