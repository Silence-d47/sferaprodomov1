import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Blog
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Všechny články')
                .child(S.documentList().title('Všechny články').filter('_type == "post"')),
              S.listItem()
                .title('Články podle kategorie')
                .child(
                  S.documentTypeList('category')
                    .title('Články podle kategorie')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && $categoryId in categories[]._ref')
                        .params({ categoryId }),
                    ),
                ),
            ]),
        ),
      // Authors
      S.listItem()
        .title('Autoři')
        .child(S.documentList().title('Autoři').filter('_type == "author"')),
      // Categories
      S.listItem()
        .title('Kategorie')
        .child(S.documentList().title('Kategorie').filter('_type == "category"')),
      // References
      S.listItem()
        .title('Reference')
        .child(
          S.list()
            .title('Reference')
            .items([
              S.listItem()
                .title('Všechny reference')
                .child(
                  S.documentList().title('Všechny reference').filter('_type == "projectReference"'),
                ),
              S.listItem()
                .title('Nastavení stránky')
                .child(
                  S.editor()
                    .id('referencePageSettings')
                    .schemaType('referencePageSettings')
                    .documentId('referencePageSettings'),
                ),
            ]),
        ),
      // Regular document types (excluding manually defined ones)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'author', 'category', 'projectReference', 'referencePageSettings'].includes(
            listItem.getId() as string,
          ),
      ),
    ])
