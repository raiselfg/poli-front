import { unstable_rethrow } from 'next/navigation';
import { getCategories } from '../../../_lib/catalog/catalog';
import { Category } from './category';

export async function CatalogList() {
  const result = await getCategories().then(
    (categories) => ({ categories, error: false as const }),
    (error: unknown) => {
      unstable_rethrow(error);
      console.error('Не удалось загрузить продукцию', error);
      return { error: true as const };
    }
  );

  if (result.error || result.categories.length === 0) {
    return (
      <p className="text-zinc-700">
        {result.error
          ? 'Не удалось загрузить продукцию. Попробуйте обновить страницу.'
          : 'Продукция пока не добавлена.'}
      </p>
    );
  }

  return (
    <div>
      {result.categories.map((category, index) => (
        <Category key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}
