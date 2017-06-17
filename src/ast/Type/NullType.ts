import {BaseType}    from "./BaseType";
import {TypeVisitor} from "./Visitor/TypeVisitor";

export class NullType extends BaseType<void>
{
    public constructor(
        schema: string = null,
        ref: string = null,
        title: string = null,
        description: string = null,
        definitions /** @todo Type. */ = null,
        allOf /** @todo Type. */ = null,
        anyOf /** @todo Type. */ = null,
        oneOf /** @todo Type. */ = null,
        not /** @todo Type. */ = null,
    )
    {
        super(
            schema,
            ref,
            title,
            description,
            null,
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
    public accept<Input, Output>(
        input: Input,
        visitor: TypeVisitor<Input, Output>,
    ): Output
    {
        return visitor.visitNullType(input, this);
    }
}
