import {TypeScriptConstructorCompiler} from "./TypeScriptConstructorCompiler";
import {TypeScriptNameFilter}          from "./TypeScriptNameFilter";
import {TypeScriptTypeReferencer}      from "./TypeScriptTypeReferencer";
import {Type}                          from "../../ast/Type/Type";
import {BaseType}                      from "../../ast/Type/BaseType";
import {ArrayType}                     from "../../ast/Type/ArrayType";
import {BooleanType}                   from "../../ast/Type/BooleanType";
import {IntegerType}                   from "../../ast/Type/IntegerType";
import {NullType}                      from "../../ast/Type/NullType";
import {NumberType}                    from "../../ast/Type/NumberType";
import {ObjectType}                    from "../../ast/Type/ObjectType";
import {StringType}                    from "../../ast/Type/StringType";
import {TypeVisitor}                   from "../../ast/Type/Visitor/TypeVisitor";

export class TypeScriptTypeDefiner implements TypeVisitor<string, string>
{
    public constructor(
        private typeReferencer: TypeScriptTypeReferencer,
        private constructorCompiler: TypeScriptConstructorCompiler,
        private nameFilter: TypeScriptNameFilter
    )
    {
    }

    /**
     * @inheritdoc
     */
    public visitBaseType(input: string, node: BaseType<string>): string
    {
        return "";
    }

    /**
     * @inheritdoc
     */
    public visitNullType(input: string, node: NullType): string
    {
        return "";
    }

    /**
     * @inheritdoc
     */
    public visitBooleanType(input: string, node: BooleanType): string
    {
        return `type MyType = boolean`;
    }

    /**
     * @inheritdoc
     */
    public visitIntegerType(input: string, node: IntegerType): string
    {
        return `type MyType = number`;
    }

    /**
     * @inheritdoc
     */
    public visitNumberType(input: string, node: NumberType): string
    {
        return `type MyType = number`;
    }

    /**
     * @inheritdoc
     */
    public visitStringType(input: string, node: StringType): string
    {
        return `type MyType = string`;
    }

    /**
     * @inheritdoc
     */
    public visitArrayType(input: string, node: ArrayType): string
    {
        return `type MyType = Array<any>`; /** @todo Element types. */
    }

    /**
     * @inheritdoc
     */
    public visitObjectType(input: string, node: ObjectType): string
    {
        const properties = [];
        const accessors  = [];

        for (const name in node.properties) {
            const typeReference = node.properties[name].types[0].accept(null, this.typeReferencer);
            properties.push(`private _${name}: ${typeReference};`);
            accessors.push(`    public set ${name}(${this.nameFilter.filter(name)}: ${typeReference})
    {
        this._${name} = ${this.nameFilter.filter(name)};
    }

    public get ${name}(): ${typeReference}
    {
        return this._${name};
    }`);
        }

        return `class ${input}
{
${properties.map(property => `    ${property}`).join("\n\n")}

${node.accept(null, this.constructorCompiler)}

${accessors.join("\n\n")}
}`;
    }
}
