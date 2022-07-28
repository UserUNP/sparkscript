[sparkscript](../README.md) / [Exports](../modules.md) / [values/Potion](../modules/values_Potion.md) / default

# Class: default

[values/Potion](../modules/values_Potion.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_Potion.default.md#constructor)

### Properties

- [amplifier](values_Potion.default.md#amplifier)
- [data](values_Potion.default.md#data)
- [duration](values_Potion.default.md#duration)
- [potion](values_Potion.default.md#potion)
- [slot](values_Potion.default.md#slot)
- [type](values_Potion.default.md#type)

### Methods

- [export](values_Potion.default.md#export)
- [from](values_Potion.default.md#from)

## Constructors

### constructor

• **new default**(`potion`, `duration`, `amplifier`, `slot?`)

Create a new potion value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `potion` | `string` | The potion name. |
| `duration` | `number` | The duration of the potion in ticks. |
| `amplifier` | `number` | Strength of the potion. |
| `slot?` | `number` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/Potion.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Potion.ts#L10)

## Properties

### amplifier

• **amplifier**: `number`

#### Defined in

[values/Potion.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Potion.ts#L10)

___

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Inherited from

[default](components_Value.default.md).[data](components_Value.default.md#data)

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

___

### duration

• **duration**: `number`

#### Defined in

[values/Potion.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Potion.ts#L10)

___

### potion

• **potion**: `string`

#### Defined in

[values/Potion.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Potion.ts#L10)

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
