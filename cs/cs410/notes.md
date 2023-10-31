# CS410 Software Engineering (Java)

## Main Notes
Java

## WebFilmz Notes
### Rating
...

### Billing

Represents a subscriber (including billing info)

class UserAccount has history and billingInfo fields.

interface Billing has end of service and bill fields.

class ReccuringCardCharge which implements interface Billing has cardInfo and expiration fields

### Dealing with Variants

- Use instancOf to distingquish variants.
    - If you know one or more of the variants 

### Dependency injection

- When a Catalog needs a set to hold all of its films where does the Set\<Film> object comes from?
    - Internally created
- When a Film decodes whether it is ratings-appropriate, where does its own Rating come from?
    - Externally provided to constructor, stored as field
- When a User searches for recommendations, when Catalog object does it use?
    - Externally provided to method, not stored