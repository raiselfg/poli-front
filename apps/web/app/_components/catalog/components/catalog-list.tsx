import { getCategories } from '../../../_lib/catalog/catalog';
import { Category } from './category';

export async function CatalogList() {
  const result = await getCategories().then(
    (categories) => ({ categories, error: false as const }),
    (error: unknown) => {
      console.error('Не удалось загрузить продукцию', error);
      return { error: true as const };
    }
  );

  if (result.error || result.categories.length === 0) {
    return (
      <p className="text-ink-muted">
        {result.error
          ? 'Не удалось загрузить продукцию. Попробуйте обновить страницу.'
          : 'Продукция пока не добавлена.'}
      </p>
    );
  }

  return (
    <div className="landing:grid-cols-2 grid gap-6">
      {result.categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
