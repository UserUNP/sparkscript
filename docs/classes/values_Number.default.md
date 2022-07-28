[sparkscript](../README.md) / [Exports](../modules.md) / [values/Number](../modules/values_Number.md) / default

# Class: default

[values/Number](../modules/values_Number.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_Number.default.md#constructor)

### Properties

- [data](values_Number.default.md#data)
- [number](values_Number.default.md#number)
- [slot](values_Number.default.md#slot)
- [type](values_Number.default.md#type)

### Methods

- [export](values_Number.default.md#export)
- [from](values_Number.default.md#from)

## Constructors

### constructor

• **new default**(`number`, `slot?`)

Create a number value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | `number` | Number. |
| `slot?` | `number` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/Number.ts:8](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Number.ts#L8)

## Properties

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Inherited from

[default](components_Value.default.md).[data](components_Value.default.md#data)

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

___

### number

• **number**: `number`

#### Defined in

[values/Number.ts:8](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Number.ts#L8)

___

### slot

• `Optional` **slot**: `number`

#### Inherited from

[default](components_Value.default.md).[slot](components_Value.default.md#slot)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

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
