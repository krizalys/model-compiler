import {Format} from "../../Format";

export class FormatFactory
{
    /**
     * @param {string} format
     *        The serialized format.
     *
     * @returns {Format}
     *          The format.
     */
    public create(format: string): Format
    {
        return FormatFactory.mappings[format];
    }

    /**
     * @var {[name: string]: Format}
     *      The mappings.
     */
    private static mappings = {
        "date-time": Format.DATE_TIME,
        "email":     Format.EMAIL,
        "hostname":  Format.HOSTNAME,
        "ipv4":      Format.IPV4,
        "ipv6":      Format.IPV6,
        "uri":       Format.URI,
    };
}
