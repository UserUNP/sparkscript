[sparkscript](../README.md) / [Exports](../modules.md) / [values/GameValue](../modules/values_GameValue.md) / default

# Class: default

[values/GameValue](../modules/values_GameValue.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_GameValue.default.md#constructor)

### Properties

- [data](values_GameValue.default.md#data)
- [slot](values_GameValue.default.md#slot)
- [target](values_GameValue.default.md#target)
- [type](values_GameValue.default.md#type)
- [value](values_GameValue.default.md#value)

### Methods

- [export](values_GameValue.default.md#export)
- [from](values_GameValue.default.md#from)

## Constructors

### constructor

• **new default**(`value`, `target?`, `slot?`)

Create a new game value.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `string` | `undefined` | The value. |
| `target` | `string` | `"Default"` | The target of the value, "Default" is the default target. |
| `slot?` | `number` | `undefined` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/GameValue.ts:9](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/GameValue.ts#L9)

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

### target

• **target**: `string` = `"Default"`

#### Defined in

[values/GameValue.ts:9](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/GameValue.ts#L9)

___

### type

• **type**: `string`

#### Inherited from

[default](components_Value.default.md).[type](components_Value.default.md#type)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

___

### value

• **value**: `string`

#### Defined in

[values/GameValue.ts:9](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/GameValue.ts#L9)

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
