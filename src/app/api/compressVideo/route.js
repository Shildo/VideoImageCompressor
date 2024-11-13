import { NextResponse } from "next/server";
import { replaceName } from "@/app/utils/replaceName";
import compressVideo from "@/app/utils/serverModules/compressVideo";
import compressVideoDTO from "@/app/utils/middlewares/compressVideoDTO";

export async function POST(request) {
	try {
		const formData = await request.formData();
		const video = formData.get('video');
		const format = formData.get('format') || 'mp4';

		const validation = await compressVideoDTO(video, format);
		if (!validation.valid) {
			return NextResponse.json({ error: validation.error }, { status: 400 });
		}

		const compressedVideoStream = await compressVideo(video, format);

		return new NextResponse(compressedVideoStream, {
			headers: {
				"Content-Type": `video/${format}`,
				"Content-Disposition": `inline; filename="${replaceName(video.name, format)}"`,
			},
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
