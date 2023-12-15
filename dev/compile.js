import * as fs from "fs";

class Compile {

    static src = "src"; 

    static getFileNames() {

        const fileNames = [];
        fs.readdirSync( this.src ).forEach( name => {
            
            if( this.isExportable( name ) ) fileNames.push( name );
        
        } );
        return fileNames;

    }
    
    static isExportable( name ) {

        return !/(.d.ts$)|(^test.ts$)/g.test( name );
    
    }

    static log() {

        const
            list = this.getFileNames(),
            { length } = list
        ;

        console.log( `${ list.join( "\n" ) }\n${ length } exportable file${ length > 1 ? "s" : "" }` );
        // fs.writeFile( 'dev/files.txt', this.listToString(), function ( err ) {

        //     if ( err ) throw err;
        //     console.log('Saved!');
        
        // });

    }

}

Compile.log();
