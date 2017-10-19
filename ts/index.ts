/*

  Things I gotta do:

  * load package.jsons, and render them with elm-static-html or something
    similar. Ideally ask Elm to tell me all of the metadata I need, too.
  * write out the sqlite database with the docs
  * write out the final HTML and sqlite db to the format dash expects

  Stretch goals for the hack day:

  * build local documentation (allow this to be configured somehow?)

 */

import * as fs from "fs";
import * as path from "path";

function args(argv: string[]): string {
    argv.forEach(function(arg) {
        if (arg == '-h' || arg == '--help') {
            console.log(`${argv[0]} [elm-package.json]`)
            process.exit(1)
        }
    })

    // assuming 0 is the interpreter, and 1 is the name
    return argv[2]
}

interface Package {
    name: string
    version: string
}

function getDocs(base: string, pkg: Package): Buffer {
    const docs = path.join(base, "elm-stuff", "packages", pkg.name, pkg.version, "documentation.json")
    return fs.readFileSync(docs)
}

function getReadme(base: string, pkg: Package): Buffer {
    const readme = path.join(base, "elm-stuff", "packages", pkg.name, pkg.version, "README.md")
    return fs.readFileSync(readme)
}

function main(argv) {
    const elmPackage = args(argv)
    const project = path.dirname(elmPackage)
    const exactDependencies = path.join(project, 'elm-stuff', 'exact-dependencies.json')
    const file = fs.readFileSync(exactDependencies)

    const rawDependencies = JSON.parse(file.toString())
    const packages: Package[] = [];

    for (var packageName in rawDependencies) {
        packages.push({ name: packageName, version: rawDependencies[packageName] })
    }

    // just get the first one for now
    const readme = getReadme(project, packages[0])
    const docs = getDocs(project, packages[0])

    console.log(readme.toString())
    console.log(JSON.parse(docs.toString()))
}

main(process.argv)
