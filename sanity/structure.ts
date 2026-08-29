import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Kee Gallery')
    .items([
      S.documentTypeListItem('essay').title('Essays'),
      S.documentTypeListItem('dispatch').title('Dispatch'),
      S.documentTypeListItem('print').title('Print Shop'),
      S.documentTypeListItem('keeEdition').title('Kee Edition'),
      S.documentTypeListItem('drop').title('$1 More Drops'),
      S.documentTypeListItem('artist').title('Artists'),
      S.documentTypeListItem('project').title('Projects'),
    ])