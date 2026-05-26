const fs = require('fs');
const path = require('path');
const { default: OpenAI, toFile } = require('/data/data/com.termux/files/home/.npm-global/lib/node_modules/openclaw/node_modules/openai');

const client = new OpenAI();

const referencePath = '/data/data/com.termux/files/home/.openclaw/workspace/agent_builder_public/assets/daeguru/daeguru_9.png';
const outputDir = '/data/data/com.termux/files/home/.openclaw/workspace/election2663-archive-public/assets/news/election2663-day04-report';

const scenes = [
  {
    filename: 'cover.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot stands at a podium holding up two overlapping bar charts showing poll numbers neck-and-neck at nearly 50-50, with a magnifying glass in the other claw examining the fine print. Infographic elements: small pie chart icons, percentage labels, a telephone icon vs robot icon representing survey methods. Use peach and lavender accents, clean composition, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '01.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot enthusiastically pulls in newspaper clippings and data cards from a stream of floating documents, sorting them into neat piles with a satisfied expression. Infographic elements: small bar chart icons, a tally counter, floating magnifying glass icons. Use light blue and mint accents, clean spacing, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '02.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot presents a large comparison board with two columns of stacked blocks side by side — one column with a telephone icon and the other with a robot icon — looking thoughtfully at the difference. Infographic elements: percentage labels on blocks, comparison arrows, a small grid layout. Use lavender and purple accents, clean geometry, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '03.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot holds a clipboard with four portrait silhouettes in a row, examining each one carefully with a magnifying glass. Infographic elements: small checkmark and X icons, document icons, graduation cap icons above each silhouette. Use mint and light green accents, clean composition, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '04.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot looks excited and points at a calendar with one date circled, holding a megaphone in the other claw. A small TV screen icon with a debate stage is visible. Infographic elements: calendar grid, countdown number labels, ballot box icon, clock icons. Use warm coral and peach accents, dynamic but uncluttered composition, subtle shadows, and a polished blog-illustration feel.',
  },
];

async function generateScene(scene, imageFile) {
  console.log(`Generating ${scene.filename}...`);
  try {
    const response = await client.images.edit({
      model: 'gpt-image-1',
      image: imageFile,
      prompt: scene.prompt,
      size: '1024x1024',
      output_format: 'png',
      quality: 'high',
      background: 'opaque',
      input_fidelity: 'high',
    });

    const image = response.data && response.data[0];
    if (!image || !image.b64_json) {
      throw new Error(`No base64 image returned for ${scene.filename}.`);
    }

    const outputPath = path.join(outputDir, scene.filename);
    fs.writeFileSync(outputPath, Buffer.from(image.b64_json, 'base64'));
    console.log(`Saved ${outputPath} (${Buffer.from(image.b64_json, 'base64').length} bytes)`);
  } catch (err) {
    console.error(`Error generating ${scene.filename}:`, err.message);
    if (err.status) console.error('Status:', err.status);
    if (err.error) console.error('Error body:', JSON.stringify(err.error));
  }
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const referenceBytes = fs.readFileSync(referencePath);
  console.log(`Reference image: ${referenceBytes.length} bytes`);

  for (const scene of scenes) {
    const imageFile = await toFile(referenceBytes, 'daeguru_9.png', { type: 'image/png' });
    await generateScene(scene, imageFile);
  }
  console.log('Done!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
