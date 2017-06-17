import {TypeVisitor} from "./Visitor/TypeVisitor";
import {Type}        from "./Type";

export class BaseType<Default> implements Type
{
    public constructor(
        public schema: string = null,
        public ref: string = null,
        public title: string = null,
        public description: string = null,
        public default_: Default = null,
        public definitions /** @todo Type. */ = null,
        public allOf /** @todo Type. */ = null,
        public anyOf /** @todo Type. */ = null,
        public oneOf /** @todo Type. */ = null,
        public not /** @todo Type. */ = null,
    )
    {
    }

    /**
     * @inheritdoc
     */
    accept<Input, Output>(
        input: Input,
        visitor: TypeVisitor<Input, Output>,
    ): Output
    {
        return visitor.visitBaseType(input, this);
    }
}
