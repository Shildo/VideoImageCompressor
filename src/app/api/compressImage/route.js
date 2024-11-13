import { NextResponse } from "next/server";
import { replaceName } from "@/app/utils/replaceName";
import compressImage from "@/app/utils/serverModules/compressImage";
import compressImageDTO from "@/app/utils/middlewares/compressImageDTO";

export async function POST(request) {
	try {
		const formData = await request.formData();
		const imageFile = formData.get('image');

		if (!imageFile || !(imageFile instanceof File)) {
			return NextResponse.json({ error: 'No image file uploaded.' }, { status: 400 });
		}

		const format = formData.get('format') || 'webp';
		const quality = formData.get('quality') || '80';

		const imageBuffer = await imageFile.arrayBuffer();
		const image = {
			buffer: Buffer.from(imageBuffer),
			name: imageFile.name,
			type: imageFile.type,
			size: imageFile.size,
		};

		const validation = await compressImageDTO(image, format, quality);
		if (!validation.valid) {
			return NextResponse.json({ error: validation.error }, { status: 400 });
		}

		const imageResponse = await compressImage(image, format, parseInt(quality, 10));
		if (!imageResponse.ok) {
			return NextResponse.json({ error: imageResponse.error }, { status: 500 });
		}

		return new NextResponse(imageResponse.compressedImage, {
			headers: {
				"Content-Type": `image/${format}`,
				"Content-Disposition": `inline; filename="${replaceName(image.name, format)}"`,
			},
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
