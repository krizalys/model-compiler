import {TypeScriptNameFilter}     from "./TypeScriptNameFilter";
import {TypeScriptTypeEvaluator}  from "./TypeScriptTypeEvaluator";
import {TypeScriptTypeReferencer} from "./TypeScriptTypeReferencer";
import {Type}                     from "../../ast/Type/Type";
import {BaseType}                 from "../../ast/Type/BaseType";
import {ArrayType}                from "../../ast/Type/ArrayType";
import {BooleanType}              from "../../ast/Type/BooleanType";
import {IntegerType}              from "../../ast/Type/IntegerType";
import {NullType}                 from "../../ast/Type/NullType";
import {NumberType}               from "../../ast/Type/NumberType";
import {ObjectType}               from "../../ast/Type/ObjectType";
import {StringType}               from "../../ast/Type/StringType";
import {TypeVisitor}              from "../../ast/Type/Visitor/TypeVisitor";

export class TypeScriptConstructorCompiler implements TypeVisitor<void, string>
{
    public constructor(
        private typeReferencer: TypeScriptTypeReferencer,
        private typeEvaluator: TypeScriptTypeEvaluator,
        private typeScriptNameFilter: TypeScriptNameFilter
    )
    {
    }

    /**
     * @inheritdoc
     */
    public visitBaseType(input: void, node: BaseType<void>): string
    {
        return "";
    }

    /**
     * @inheritdoc
     */
    public visitNullType(input: void, node: NullType): string
    {
        return "null";
    }

    /**
     * @inheritdoc
     */
    public visitBooleanType(input: void, node: BooleanType): string
    {
        return "false";
    }

    /**
     * @inheritdoc
     */
    public visitIntegerType(input: void, node: IntegerType): string
    {
        return "0";
    }

    /**
     * @inheritdoc
     */
    public visitNumberType(input: void, node: NumberType): string
    {
        return "0.0";
    }

    /**
     * @inheritdoc
     */
    public visitStringType(input: void, node: StringType): string
    {
        return `"string"`;
    }

    /**
     * @inheritdoc
     */
    public visitArrayType(input: void, node: ArrayType): string
    {
        return "[]";
    }

    /**
     * @inheritdoc
     */
    public visitObjectType(input: void, node: ObjectType): string
    {
        const parameters  = [];
        const assignments = [];

        for (const name in node.properties) {
            const typeReference = node.properties[name].types[0].accept(null, this.typeReferencer);
            const value         = node.properties[name].types[0].accept(null, this.typeEvaluator);
            parameters.push(`${this.typeScriptNameFilter.filter(name)}: ${typeReference} = ${value}`);
            assignments.push(`this.${name} = ${this.typeScriptNameFilter.filter(name)};`);
        }

        return `    public constructor(
${parameters.map(parameter => `        ${parameter}`).join(",\n")}
    )
    {
${assignments.map(assignment => `        ${assignment}`).join("\n")}
    }`;
    }
}
