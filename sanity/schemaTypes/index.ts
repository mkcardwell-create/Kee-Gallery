import { type SchemaTypeDefinition } from 'sanity'
import { essayType } from './essayType'
import { dispatchType } from './dispatchType'
import { printType } from './printType'
import { keeEditionType } from './keeEditionType'
import { dropType } from './dropType'
import { artistType } from './artistType'
import { projectType } from './projectType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    essayType,
    dispatchType,
    printType,
    keeEditionType,
    dropType,
    artistType,
    projectType,
  ],
}