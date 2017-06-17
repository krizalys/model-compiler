import {BaseType}    from "./BaseType";
import {TypeVisitor} from "./Visitor/TypeVisitor";

export abstract class NumericType extends BaseType<number>
{
    public constructor(
        schema: string = null,
        ref: string = null,
        title: string = null,
        description: string = null,
        default_: number = 0, /** @todo null */
        definitions /** @todo Type. */ = null,
        allOf /** @todo Type. */ = null,
        anyOf /** @todo Type. */ = null,
        oneOf /** @todo Type. */ = null,
        not /** @todo Type. */ = null,
        public maximum: number = null,
        public minimum: number = null,
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
        );
    }

    /**
     * @inheritdoc
     */
    abstract accept<Input, Output>(
        input: Input,
        visitor: TypeVisitor<Input, Output>,
    ): Output;
}
