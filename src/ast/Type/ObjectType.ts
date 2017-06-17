import {BaseType}    from "./BaseType";
import {TypeVisitor} from "./Visitor/TypeVisitor";

export class ObjectType extends BaseType<object>
{
    public constructor(
        schema: string = null,
        ref: string = null,
        title: string = null,
        description: string = null,
        default_: object = {}, /** @todo null */
        definitions /** @todo Type. */ = null,
        allOf /** @todo Type. */ = null,
        anyOf /** @todo Type. */ = null,
        oneOf /** @todo Type. */ = null,
        not /** @todo Type. */ = null,
        public maxProperties: number = null,
        public minProperties: number = null,
        public required: Array<string> = null,
        public additionalProperties /** @todo Type. */ = null,
        public properties /** @todo Type. */ = null,
        public dependencies /** @todo Type. */ = null,
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
        return visitor.visitObjectType(input, this);
    }
}
