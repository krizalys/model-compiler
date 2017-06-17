import {TypeVisitor} from "./Visitor/TypeVisitor";

export interface Type
{
    /**
     *
     *
     * @param {Input} input
     *
     * @param {TypeVisitor<Input, Output>} visitor
     *
     *
     * @returns {Output}
     *
     */
    accept<Input, Output>(
        input: Input,
        visitor: TypeVisitor<Input, Output>,
    ): Output;
}
