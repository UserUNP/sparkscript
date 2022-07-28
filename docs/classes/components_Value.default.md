[sparkscript](../README.md) / [Exports](../modules.md) / [components/Value](../modules/components_Value.md) / default

# Class: default

[components/Value](../modules/components_Value.md).default

## Hierarchy

- **`default`**

  ↳ [`default`](values_GameValue.default.md)

  ↳ [`default`](values_Location.default.md)

  ↳ [`default`](values_MinecraftItem.default.md)

  ↳ [`default`](values_Number.default.md)

  ↳ [`default`](values_Potion.default.md)

  ↳ [`default`](values_Text.default.md)

  ↳ [`default`](values_Variable.default.md)

  ↳ [`default`](values_Vector.default.md)

## Table of contents

### Constructors

- [constructor](components_Value.default.md#constructor)

### Properties

- [data](components_Value.default.md#data)
- [slot](components_Value.default.md#slot)
- [type](components_Value.default.md#type)

### Methods

- [export](components_Value.default.md#export)
- [from](components_Value.default.md#from)

## Constructors

### constructor

• **new default**(`type`, `value`, `slot?`)

Create a new value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | Type of the value. |
| `value` | `Object` | The value property. |
| `slot?` | `number` | Specific slot number. |

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

## Properties

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

___

### slot

• `Optional` **slot**: `number`

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

___

### type

• **type**: `string`

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

#### Defined in

[components/Value.ts:11](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L11)
