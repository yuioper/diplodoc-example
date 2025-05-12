import mermaid from '@diplodoc/mermaid-extension';
import transform from '@diplodoc/transform';

const {result} = await transform(`
\`\`\`mermaid
graph TD
   A[Christmas] -->|Get money| B(Go shopping)
\`\`\`
`, {
   plugins: [
       mermaid.transform({ bundle: false })
   ]
});
