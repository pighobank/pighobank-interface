import {defineConfig} from '@wagmi/cli';
import {react} from '@wagmi/cli/plugins';
export default defineConfig({
  out: 'src/abis/types/generated.ts',
  plugins: [react()],
});
