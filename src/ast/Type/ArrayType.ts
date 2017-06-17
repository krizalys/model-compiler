import {BaseType}    from "./BaseType";
import {TypeVisitor} from "./Visitor/TypeVisitor";

export class ArrayType extends BaseType<Array<any>>
{
    public constructor(
        schema: string = null,
        ref: string = null,
        title: string = null,
        description: string = null,
        default_: Array<any> = [], /** @todo null */
        definitions /** @todo Type. */ = null,
        allOf /** @todo Type. */ = null,
        anyOf /** @todo Type. */ = null,
        oneOf /** @todo Type. */ = null,
        not /** @todo Type. */ = null,
        public items /** @todo Type. */ = null,
        public maxItems: number = null,
        public minItems: number = null,
        public uniqueItems: boolean = null,
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
        return visitor.visitArrayType(input, this);
    }
}
