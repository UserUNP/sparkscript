[sparkscript](../README.md) / [Exports](../modules.md) / [components/DataStorage](../modules/components_DataStorage.md) / default

# Class: default

[components/DataStorage](../modules/components_DataStorage.md).default

## Table of contents

### Constructors

- [constructor](components_DataStorage.default.md#constructor)

### Properties

- [owner](components_DataStorage.default.md#owner)
- [raw](components_DataStorage.default.md#raw)

### Accessors

- [entries](components_DataStorage.default.md#entries)
- [keys](components_DataStorage.default.md#keys)
- [length](components_DataStorage.default.md#length)
- [values](components_DataStorage.default.md#values)

### Methods

- [assignOwner](components_DataStorage.default.md#assignowner)
- [clear](components_DataStorage.default.md#clear)
- [delete](components_DataStorage.default.md#delete)
- [get](components_DataStorage.default.md#get)
- [has](components_DataStorage.default.md#has)
- [list](components_DataStorage.default.md#list)
- [set](components_DataStorage.default.md#set)
- [toString](components_DataStorage.default.md#tostring)
- [from](components_DataStorage.default.md#from)

## Constructors

### constructor

• **new default**()

## Properties

### owner

• **owner**: ``null`` \| [`default`](components_Value.default.md) = `null`

#### Defined in

[components/DataStorage.ts:23](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L23)

___

### raw

• **raw**: [`serializedDataProperty`](../interfaces/components_DataStorage.serializedDataProperty.md) = `{}`

#### Defined in

[components/DataStorage.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L22)

## Accessors

### entries

• `get` **entries**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Defined in

[components/DataStorage.ts:97](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L97)

___

### keys

• `get` **keys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[components/DataStorage.ts:89](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L89)

___

### length

• `get` **length**(): `number`

#### Returns

`number`

#### Defined in

[components/DataStorage.ts:85](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L85)

___

### values

• `get` **values**(): `any`[]

#### Returns

`any`[]

#### Defined in

[components/DataStorage.ts:93](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L93)

## Methods

### assignOwner

▸ **assignOwner**(`owner`): `void`

Assign owner to this DataStorage for later use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`default`](components_Value.default.md) | Value object that owns this DataStorage. |

#### Returns

`void`

#### Defined in

[components/DataStorage.ts:29](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L29)

___

### clear

▸ **clear**(): `void`

Clear entire DataStorage.

#### Returns

`void`

#### Defined in

[components/DataStorage.ts:81](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L81)

___

### delete

▸ **delete**(`key`): `void`

Remove a key from the DataStorage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to be removed. |

#### Returns

`void`

#### Defined in

[components/DataStorage.ts:74](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L74)

___

### get

▸ **get**(`key`): `any`

Get a value from the DataStorage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to be retrieved. |

#### Returns

`any`

Value of the key.

#### Defined in

[components/DataStorage.ts:50](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L50)

___

### has

▸ **has**(`key`): `boolean`

Check if the DataStorage has a key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to be checked. |

#### Returns

`boolean`

True if the key exists, false otherwise.

#### Defined in

[components/DataStorage.ts:59](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L59)

___

### list

▸ **list**(): `string`[]

Alias for `DataStorage.keys`.

#### Returns

`string`[]

#### Defined in

[components/DataStorage.ts:66](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L66)

___

### set

▸ **set**(`key`, `value`): [`default`](components_DataStorage.default.md)

Set a value in the DataStorage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to be set. |
| `value` | `any` | Value to be set. |

#### Returns

[`default`](components_DataStorage.default.md)

Chainable DataStorage object.

#### Defined in

[components/DataStorage.ts:40](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L40)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[components/DataStorage.ts:101](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L101)

___

### from

▸ `Static` **from**(`raw`): [`default`](components_DataStorage.default.md)

Create a new DataStorage from a JSON object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `raw` | [`serializedDataProperty`](../interfaces/components_DataStorage.serializedDataProperty.md) | Raw data to be converted to DataStorage. |

#### Returns

[`default`](components_DataStorage.default.md)

DataStorage object.

#### Defined in

[components/DataStorage.ts:14](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/DataStorage.ts#L14)
