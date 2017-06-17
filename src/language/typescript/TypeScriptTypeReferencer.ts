import {Type}        from "../../ast/Type/Type";
import {BaseType}    from "../../ast/Type/BaseType";
import {ArrayType}   from "../../ast/Type/ArrayType";
import {BooleanType} from "../../ast/Type/BooleanType";
import {IntegerType} from "../../ast/Type/IntegerType";
import {NullType}    from "../../ast/Type/NullType";
import {NumberType}  from "../../ast/Type/NumberType";
import {ObjectType}  from "../../ast/Type/ObjectType";
import {StringType}  from "../../ast/Type/StringType";
import {TypeVisitor} from "../../ast/Type/Visitor/TypeVisitor";

export class TypeScriptTypeReferencer implements TypeVisitor<void, string>
{
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
        return "";
    }

    /**
     * @inheritdoc
     */
    public visitBooleanType(input: void, node: BooleanType): string
    {
        return "boolean";
    }

    /**
     * @inheritdoc
     */
    public visitIntegerType(input: void, node: IntegerType): string
    {
        return "number";
    }

    /**
     * @inheritdoc
     */
    public visitNumberType(input: void, node: NumberType): string
    {
        return "number";
    }

    /**
     * @inheritdoc
     */
    public visitStringType(input: void, node: StringType): string
    {
        return "string";
    }

    /**
     * @inheritdoc
     */
    public visitArrayType(input: void, node: ArrayType): string
    {
        const items = node.items !== null ? node.items.types[0].accept(null, this) : "any";
        return `Array<${items}>`;
    }

    /**
     * @inheritdoc
     */
    public visitObjectType(input: void, node: ObjectType): string
    {
        return "object";
    }
}
