import {readFileSync}                  from "fs";
import * as jsonSchemaRefParser        from "json-schema-ref-parser";
import {basename}                      from "path";
import {JsonSchema}                    from "./JsonSchema";
import {Node}                          from "./ast/Node";
import {Type}                          from "./ast/Type/Type";
import {BaseType}                      from "./ast/Type/BaseType";
import {ArrayType}                     from "./ast/Type/ArrayType";
import {BooleanType}                   from "./ast/Type/BooleanType";
import {IntegerType}                   from "./ast/Type/IntegerType";
import {NullType}                      from "./ast/Type/NullType";
import {NumberType}                    from "./ast/Type/NumberType";
import {ObjectType}                    from "./ast/Type/ObjectType";
import {StringType}                    from "./ast/Type/StringType";
import {TypeVisitor}                   from "./ast/Type/Visitor/TypeVisitor";
import {JsonSchemaCompiler}            from "./Compiler/JsonSchemaCompiler";
import {TypeScriptCompiler}            from "./Compiler/TypeScriptCompiler";
import {TypeScriptConstructorCompiler} from "./language/typescript/TypeScriptConstructorCompiler";
import {TypeScriptNameFilter}          from "./language/typescript/TypeScriptNameFilter";
import {TypeScriptTypeDefiner}         from "./language/typescript/TypeScriptTypeDefiner";
import {TypeScriptTypeEvaluator}       from "./language/typescript/TypeScriptTypeEvaluator";
import {TypeScriptTypeReferencer}      from "./language/typescript/TypeScriptTypeReferencer";

/**
 * Draft 6.
 */
class Compiler
{
    public compile(schema: JsonSchema): Promise<Node>
    {
        return new Promise(
            (resolve, reject) =>
                jsonSchemaRefParser
                    .dereference(schema)
                    .then(
                        schema => {
                            const node = this.compileSchema(schema);
                            resolve(node);
                        }
                    )
                    .catch(reject)
        );
    }

    private compileSchema(schema: any): Node
    {
        if (!("type" in schema)) {
            const types = [this.compileBaseNode(schema)];
            return new Node(types);
        }

        let types = schema["type"];

        if (Object.getPrototypeOf(types) != Array.prototype) {
            types = [types];
        }

        types = types.map(
            type => {
                switch (type) {
                    case "null":
                        return this.compileNullInstance(schema);

                    case "boolean":
                        return this.compileBooleanInstance(schema);

                    case "integer":
                        return this.compileIntegerInstance(schema);

                    case "number":
                        return this.compileNumberInstance(schema);

                    case "string":
                        return this.compileStringInstance(schema);

                    case "array":
                        return this.compileArrayInstance(schema);

                    case "object":
                        return this.compileObjectInstance(schema);

                    default:
                        //if (Object.getPrototypeOf(type) === Array.prototype) {
                        //    return this.compileObjectInstance(schema); /** @todo Fix this. */
                        //}
                }
            }
        );

        return new Node(types);
    }

    private compileBaseNode(schema: any): BaseType<any>
    {
        return new BaseType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            "default" in schema ?
                schema["default"]
                : null,
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
        );
    }

    private compileNullInstance(schema: any): NullType
    {
        return new NullType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
        );
    }

    private compileBooleanInstance(schema: any): BooleanType
    {
        return new BooleanType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            "default" in schema ?
                schema["default"]
                : false, /** @todo null */
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
        );
    }

    private compileIntegerInstance(schema: any): IntegerType
    {
        return new IntegerType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            "default" in schema ?
                schema["default"]
                : 0, /** @todo null */
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
            "maximum" in schema ?
                schema["maximum"]
                : null,
            "minimum" in schema ?
                schema["minimum"]
                : null,
        );
    }

    private compileNumberInstance(schema: any): NumberType
    {
        return new NumberType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            "default" in schema ?
                schema["default"]
                : 0.0, /** @todo null */
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
            "maximum" in schema ?
                schema["maximum"]
                : null,
            "minimum" in schema ?
                schema["minimum"]
                : null,
        );
    }

    private compileStringInstance(schema: any): StringType
    {
        return new StringType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            "default" in schema ?
                schema["default"]
                : "", /** @todo null */
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
            "format" in schema ?
                schema["format"]
                : null,
        );
    }

    private compileArrayInstance(schema: any): ArrayType
    {
        return new ArrayType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            "default" in schema ?
                schema["default"]
                : [], /** @todo null */
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
            "items" in schema ?
                this.compileSchema(schema["items"])
                : null,
            "maxItems" in schema ?
                schema["maxItems"]
                : null,
            "minItems" in schema ?
                schema["minItems"]
                : null,
            "uniqueItems" in schema ?
                schema["uniqueItems"]
                : null,
        );
    }

    private compileObjectInstance(schema: any): ObjectType
    {
        return new ObjectType(
            "$schema" in schema ?
                schema["$schema"]
                : null,
            "$ref" in schema ?
                schema["$ref"]
                : null,
            "title" in schema ?
                schema["title"]
                : null,
            "description" in schema ?
                schema["description"]
                : null,
            "default" in schema ?
                schema["default"]
                : {}, /** @todo null */
            this.parseDefinitons(schema),
            "allOf" in schema ?
                schema["allOf"].map(schema => this.compileSchema(schema))
                : null,
            "anyOf" in schema ?
                schema["anyOf"].map(schema => this.compileSchema(schema))
                : null,
            "oneOf" in schema ?
                schema["oneOf"].map(schema => this.compileSchema(schema))
                : null,
            "not" in schema ?
                this.compileSchema(schema["not"])
                : null,
            "maxProperties" in schema ?
                schema["maxProperties"]
                : null,
            "minProperties" in schema ?
                schema["minProperties"]
                : null,
            "required" in schema ?
                schema["required"]
                : null,
            "additionalProperties" in schema ?
                this.compileSchema(schema["additionalProperties"])
                : null,
            this.parseProperties(schema),
            "dependencies" in schema ?
                schema["dependencies"]
                : null,
        );
    }

    private parseDefinitons(schema: any): null|object
    {
        if (!("definitions" in schema)) {
            return null;
        }

        const definitions = {};
        let   childNode;

        for (const name in schema["definitions"]) {
            childNode = this.compileSchema(schema["definitions"][name]);

            if (childNode !== null) {
                definitions[name] = childNode;
            }
        }

        return definitions;
    }

    private parseProperties(schema: any): null|object
    {
        if (!("properties" in schema)) {
            return null;
        }

        const properties = {};
        let   childNode;

        for (const name in schema["properties"]) {
            childNode = this.compileSchema(schema["properties"][name]);

            if (childNode !== null) {
                properties[name] = childNode;
            }
        }

        return properties;
    }
}

const target   = process.argv[4];
const filename = process.argv[5];

const json = readFileSync(
    filename,
    {
        encoding: "utf8",
    }
);

const schema   = JSON.parse(json);
const compiler = new Compiler();

compiler
    .compile(schema)
    .then(
        compiled => {
            if (target == "json") {
                const jsonSchemaCompiler = new JsonSchemaCompiler();

                console.log(jsonSchemaCompiler.compile(
                    compiled,
                    basename(filename, ".json")
                ));
            } else if (target == "ts") {
                const typeScriptNameFilter = new TypeScriptNameFilter();
                const typeScriptTypeReferencer = new TypeScriptTypeReferencer();

                const typeScriptTypeEvaluator = new TypeScriptTypeEvaluator();

                const typeScriptConstructorCompiler = new TypeScriptConstructorCompiler(
                    typeScriptTypeReferencer,
                    typeScriptTypeEvaluator,
                    typeScriptNameFilter
                );

                const typeScriptTypeDefiner = new TypeScriptTypeDefiner(
                    typeScriptTypeReferencer,
                    typeScriptConstructorCompiler,
                    typeScriptNameFilter
                );

                const typeScriptCompiler = new TypeScriptCompiler(
                    typeScriptTypeDefiner
                );

                console.log(typeScriptCompiler.compile(
                    compiled,
                    basename(filename, ".json")
                ));
            }

            process.exit(0);
        }
    )
    .catch(
        error => {
            console.error(error);
            process.exit(-1);
        }
    );
