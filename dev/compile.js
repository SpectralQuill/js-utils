import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

function createBuildSettings( options ) {

    return {
        entryPoints: [ "dev/test.ts" ],
        outfile: "dev/test.js",
        bundle: true,
        plugins: [
            esbuildPluginTsc({
                force: true
            })
        ],
        ...options
    };

}

const settings = createBuildSettings( { minify: true } );
await esbuild.build( settings );
