export enum Format
{
    DATE_TIME, // Date representation, as defined by RFC 3339, section 5.6.
    EMAIL,     // Internet email address, see RFC 5322, section 3.4.1.
    HOSTNAME,  // Internet host name, see RFC 1034, section 3.1.
    IPV4,      // IPv4 address, according to dotted-quad ABNF syntax as defined in RFC 2673, section 3.2.
    IPV6,      // IPv6 address, as defined in RFC 2373, section 2.2.
    URI,       // A universal resource identifier (URI), according to RFC3986.
}
