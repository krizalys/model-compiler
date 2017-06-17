import {ArrayType}   from "../ArrayType";
import {BaseType}    from "../BaseType";
import {BooleanType} from "../BooleanType";
import {IntegerType} from "../IntegerType";
import {NullType}    from "../NullType";
import {NumberType}  from "../NumberType";
import {ObjectType}  from "../ObjectType";
import {StringType}  from "../StringType";

export interface TypeVisitor<Input, Output>
{
    visitBaseType<Default>(input: Input, type: BaseType<Default>): Output;
    visitNullType(input: Input, type: NullType): Output;
    visitBooleanType(input: Input, type: BooleanType): Output;
    visitIntegerType(input: Input, type: IntegerType): Output;
    visitNumberType(input: Input, type: NumberType): Output;
    visitStringType(input: Input, type: StringType): Output;
    visitArrayType(input: Input, type: ArrayType): Output;
    visitObjectType(input: Input, type: ObjectType): Output;
}
