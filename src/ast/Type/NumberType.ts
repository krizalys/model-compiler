import {NumericType} from "./NumericType";
import {TypeVisitor} from "./Visitor/TypeVisitor";

export class NumberType extends NumericType
{
    public constructor(
        schema: string = null,
        ref: string = null,
        title: string = null,
        description: string = null,
        default_: number = 0.0, /** @todo null */
        definitions /** @todo Type. */ = null,
        allOf /** @todo Type. */ = null,
        anyOf /** @todo Type. */ = null,
        oneOf /** @todo Type. */ = null,
        not /** @todo Type. */ = null,
        maximum: number = null,
        minimum: number = null,
    )
    {
        super(
            schema,
            ref,
            title,
            description,
            default_,
            definitions,
            allOf,
            anyOf,
            oneOf,
            not,
            maximum,
            minimum,
        );
    }

    /**
     * @inheritdoc
     */
    public accept<Input, Output>(
        input: Input,
        visitor: TypeVisitor<Input, Output>,
    ): Output
    {
        return visitor.visitNumberType(input, this);
    }
}
