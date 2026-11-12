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
  if (result.error)
    return (
      <p className="text-[#607d8d]">
        Не удалось загрузить продукцию. Попробуйте обновить страницу.
      </p>
    );
  if (result.categories.length === 0)
    return <p className="text-[#607d8d]">Продукция пока не добавлена.</p>;
  return (
    <div>
      {result.categories.map((category, index) => (
        <Category key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}
