import {expect}       from "chai";
import {exec}         from "child_process";
import {withData}     from "leche";
import {basename}     from "path";

import {
    readdirSync,
    readFileSync,
} from "fs";

describe("Compiler", () => {
    withData(
        {
            "Person":   ["Person"],
            "geo":      ["geo"],
            "card":     ["card"],     /** @todo Make it compile. */
            "calendar": ["calendar"], /** @todo Make it compile. */
            "address":  ["address"],
        },
        basename => {
            it("should produce the expected output", done => {
                const expected = JSON.parse(readFileSync(
                    `${__dirname}/fixture/${basename}_expected.json`,
                    {
                        encoding: "utf8",
                    }
                ));

                exec(
                    `../../node_modules/.bin/ts-node ../../src/index.ts -- --target json fixture/${basename}.json`,
                    {
                        cwd: __dirname,
                    },
                    (error, stdout, stderr) => {
                        if (error) {
                            return done(error);
                        }

                        expect(JSON.parse(stdout)).to.deep.equal(expected);
                        done();
                    }
                );
            });

            it("should produce the expected TypeScript output", done => {
                const expected = readFileSync(
                    `${__dirname}/fixture/${basename}.ts`,
                    {
                        encoding: "utf8",
                    }
                );

                exec(
                    `../../node_modules/.bin/ts-node ../../src/index.ts -- --target ts fixture/${basename}.json`,
                    {
                        cwd: __dirname,
                    },
                    (error, stdout, stderr) => {
                        if (error) {
                            return done(error);
                        }

                        expect(stdout).to.equal(expected);
                        done();
                    }
                );
            });
        }
    );

    /*withData(
        {
            "sample-json-schemas/avro": [
                "fge",
                "sample-json-schemas/avro",
            ],
            "sample-json-schemas/geojson": [
                "fge",
                "sample-json-schemas/geojson",
            ],
            "sample-json-schemas/json-home": [
                "fge",
                "sample-json-schemas/json-home",
            ],
            "sample-json-schemas/json-patch": [
                "fge",
                "sample-json-schemas/json-patch",
            ],
            "sample-json-schemas/jsonrpc2.0": [
                "fge",
                "sample-json-schemas/jsonrpc2.0",
            ],
            "sample-json-schemas/json-stat": [
                "fge",
                "sample-json-schemas/json-stat",
            ],
            "sample-json-schemas/smd": [
                "fge",
                "sample-json-schemas/smd",
            ],
            "sample-json-schemas/swagger": [
                "fge",
                "sample-json-schemas/swagger",
            ],
        },
        (base, dirname) =>
            readdirSync(`${__dirname}/fixture/${base}/${dirname}`)
                .map(filename => basename(filename, ".json"))
                .forEach(
                    basename =>
                        it(
                            "should produce the expected output",
                            done => {
                                const expected = JSON.parse(readFileSync(
                                    `${__dirname}/fixture/${base}.expected/${dirname}/${basename}.json`,
                                    {
                                        encoding: "utf8",
                                    }
                                ));

                                exec(
                                    `../../node_modules/.bin/ts-node ../../src/index.ts -- --target json ${__dirname}/fixture/${base}/${dirname}/${basename}.json`,
                                    {
                                        cwd: __dirname,
                                    },
                                    (error, stdout, stderr) => {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(JSON.parse(stdout)).to.deep.equal(expected);
                                        done();
                                    }
                                );
                            }
                        )
                )
    );*/
});
