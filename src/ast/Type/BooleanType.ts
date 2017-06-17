import {BaseType}    from "./BaseType";
import {TypeVisitor} from "./Visitor/TypeVisitor";

export class BooleanType extends BaseType<boolean>
{
    public constructor(
        schema: string = null,
        ref: string = null,
        title: string = null,
        description: string = null,
        default_: boolean = false, /** @todo null */
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
    public accept<Input, Output>(
        input: Input,
        visitor: TypeVisitor<Input, Output>,
    ): Output
    {
        return visitor.visitBooleanType(input, this);
    }
}
