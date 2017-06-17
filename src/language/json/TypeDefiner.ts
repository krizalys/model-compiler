import {Type}        from "../../ast/Type/Type";
import {BaseType}    from "../../ast/Type/BaseType";
import {ArrayType}   from "../../ast/Type/ArrayType";
import {BooleanType} from "../../ast/Type/BooleanType";
import {IntegerType} from "../../ast/Type/IntegerType";
import {NullType}    from "../../ast/Type/NullType";
import {NumberType}  from "../../ast/Type/NumberType";
import {NumericType} from "../../ast/Type/NumericType";
import {ObjectType}  from "../../ast/Type/ObjectType";
import {StringType}  from "../../ast/Type/StringType";
import {TypeVisitor} from "../../ast/Type/Visitor/TypeVisitor";

export class TypeDefiner implements TypeVisitor<void, object>
{
    /**
     * @inheritdoc
     */
    public visitBaseType<Default>(input: void, node: BaseType<Default>): object
    {
        return this.mergeBaseProperties({}, node);
    }

    /**
     * @inheritdoc
     */
    public visitNullType(input: void, node: NullType): object
    {
        const output = {
            type: "null",
        };

        return this.mergeBaseProperties(output, node);
    }

    /**
     * @inheritdoc
     */
    public visitBooleanType(input: void, node: BooleanType): object
    {
        const output = {
            type: "boolean",
        };

        return this.mergeBaseProperties(output, node);
    }

    /**
     * @inheritdoc
     */
    public visitIntegerType(input: void, node: IntegerType): object
    {
        const output = {
            type: "integer",
        };

        return this.mergeBaseProperties(
            this.mergeNumericProperties(output, node),
            node
        );
    }

    /**
     * @inheritdoc
     */
    public visitNumberType(input: void, node: NumberType): object
    {
        const output = {
            type: "number",
        };

        return this.mergeBaseProperties(
            this.mergeNumericProperties(output, node),
            node
        );
    }

    /**
     * @inheritdoc
     */
    public visitStringType(input: void, node: StringType): object
    {
        const output = {
            type: "string",
        };

        if (node.format !== null) {
            output["format"] = node.format;
        }

        return this.mergeBaseProperties(output, node);
    }

    /**
     * @inheritdoc
     */
    public visitArrayType(input: void, node: ArrayType): object
    {
        const output = {
            type: "array",
        };

        if (node.items !== null) {
            output["items"] = node.items.types[0].accept(null, this);
        }

        if (node.maxItems !== null) {
            output["maxItems"] = node.maxItems;
        }

        if (node.minItems !== null) {
            output["minItems"] = node.minItems;
        }

        if (node.uniqueItems !== null) {
            output["uniqueItems"] = node.uniqueItems;
        }

        return this.mergeBaseProperties(output, node);
    }

    /**
     * @inheritdoc
     */
    public visitObjectType(input: void, node: ObjectType): object
    {
        const output = {
            type: "object",
        };

        if (node.maxProperties !== null) {
            output["maxProperties"] = node.maxProperties;
        }

        if (node.minProperties !== null) {
            output["minProperties"] = node.minProperties;
        }

        if (node.required !== null) {
            output["required"] = node.required;
        }

        if (node.additionalProperties !== null) {
            output["additionalProperties"] = node.additionalProperties.types[0].accept(null, this);
        }

        if (node.properties !== null) {
            const properties = {};

            for (const name in node.properties) {
                const childNode  = node.properties[name];
                properties[name] = childNode.types[0].accept(null, this);
            }

            output["properties"] = properties;
        }

        if (node.dependencies !== null) {
            output["dependencies"] = node.dependencies;
        }

        return this.mergeBaseProperties(output, node);
    }

    private mergeBaseProperties<Default>(input: object, node: BaseType<Default>): object
    {
        const output = {};

        if (node.schema !== null) {
            output["$schema"] = node.schema;
        }

        /** @todo Fix this ($ref is always expanded and cannot exist). */
        if (node.ref !== null) {
            output["$ref"] = node.ref;
        }

        if (node.title !== null) {
            output["title"] = node.title;
        }

        if (node.description !== null) {
            output["description"] = node.description;
        }

        if (node.definitions !== null) {
            const definitions = {};

            for (const name in node.definitions) {
                definitions[name] = node.definitions[name].types[0].accept(null, this);
            }

            output["definitions"] = definitions;
        }

        if (node.allOf !== null) {
            output["allOf"] = node.allOf.map(node => node.types[0].accept(null, this));
        }

        if (node.anyOf !== null) {
            output["anyOf"] = node.anyOf.map(node => node.types[0].accept(null, this));
        }

        if (node.oneOf !== null) {
            output["oneOf"] = node.oneOf.map(node => node.types[0].accept(null, this));
        }

        if (node.not !== null) {
            output["not"] = node.not.types[0].accept(null, this);
        }

        return Object.assign({}, input, output);
    }

    private mergeNumericProperties(input: object, node: NumericType): object
    {
        const output = {};

        if (node.maximum !== null) {
            output["maximum"] = node.maximum;
        }

        if (node.minimum !== null) {
            output["minimum"] = node.minimum;
        }

        return Object.assign({}, input, output);
    }
}
