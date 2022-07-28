[sparkscript](../README.md) / [Exports](../modules.md) / [values/Text](../modules/values_Text.md) / default

# Class: default

[values/Text](../modules/values_Text.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_Text.default.md#constructor)

### Properties

- [data](values_Text.default.md#data)
- [slot](values_Text.default.md#slot)
- [text](values_Text.default.md#text)
- [type](values_Text.default.md#type)

### Methods

- [export](values_Text.default.md#export)
- [from](values_Text.default.md#from)

## Constructors

### constructor

• **new default**(`text`, `slot?`)

Create a text value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text. |
| `slot?` | `number` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/Text.ts:8](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Text.ts#L8)

## Properties

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Inherited from

[default](components_Value.default.md).[data](components_Value.default.md#data)

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

___

### slot

• `Optional` **slot**: `number`

#### Inherited from

[default](components_Value.default.md).[slot](components_Value.default.md#slot)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

___

### text

• **text**: `string`

#### Defined in

[values/Text.ts:8](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Text.ts#L8)

___

### type

• **type**: `string`

#### Inherited from

[default](components_Value.default.md).[type](components_Value.default.md#type)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

## Methods

### export

▸ **export**(`containingBlockArguments`): [`serializedValue`](../interfaces/components_Value.serializedValue.md)

Export the value to a JSON object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `containingBlockArguments` | [`default`](components_Value.default.md)[] |

#### Returns

[`serializedValue`](../interfaces/components_Value.serializedValue.md)

DiamondFire JSON-ified value.

#### Inherited from

[default](components_Value.default.md).[export](components_Value.default.md#export)

#### Defined in

[components/Value.ts:34](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L34)

___

### from

▸ `Static` **from**(`raw`): [`default`](components_Value.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | [`serializedValue`](../interfaces/components_Value.serializedValue.md) |

#### Returns

[`default`](components_Value.default.md)

#### Inherited from

[default](components_Value.default.md).[from](components_Value.default.md#from)

#### Defined in

[components/Value.ts:11](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L11)
