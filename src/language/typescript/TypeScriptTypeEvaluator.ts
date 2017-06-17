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

export class TypeScriptTypeEvaluator implements TypeVisitor<void, string>
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
        return `""`;
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
        return "{}";
    }
}
