import { type StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Posts
      S.listItem()
        .title('Posts')
        .child(
          S.list()
            .title('Posts')
            .items([
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentList()
                    .title('All Posts')
                    .filter('_type == "post"')
                ),
              S.listItem()
                .title('Posts by Category')
                .child(
                  S.documentTypeList('category')
                    .title('Posts by Category')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && $categoryId in categories[]._ref')
                        .params({ categoryId })
                    )
                ),
            ])
        ),
      // Authors
      S.listItem()
        .title('Authors')
        .child(
          S.documentList()
            .title('Authors')
            .filter('_type == "author"')
        ),
      // Categories
      S.listItem()
        .title('Categories')
        .child(
          S.documentList()
            .title('Categories')
            .filter('_type == "category"')
        ),
      // Regular document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['post', 'author', 'category'].includes(listItem.getId() as string)
      ),
    ]) 