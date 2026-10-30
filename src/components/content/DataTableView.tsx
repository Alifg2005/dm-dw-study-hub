import type { DataTable } from '../../types/chapter'
import { RichText } from './RichText'

export function DataTableView({ table }: { table: DataTable }) {
  return (
    <figure className="min-w-0">
      {table.caption && (
        <figcaption className="mb-2 text-sm font-medium text-ink-soft">
          <RichText text={table.caption} />
        </figcaption>
      )}
      <div className="overflow-x-auto rounded-2xl border border-line" tabIndex={0} role="region" aria-label={table.caption ?? 'Data table'}>
        <table className="w-full border-collapse bg-surface text-left text-sm">
          <thead>
            <tr className="bg-sunken">
              {table.headers.map((header, index) => (
                <th key={index} scope="col" className="min-w-28 px-4 py-2.5 align-bottom font-semibold">
                  <RichText text={header} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-line">
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={cellIndex} scope="row" className="px-4 py-2.5 text-left align-top font-medium">
                      <RichText text={cell} />
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-2.5 align-top text-ink-soft">
                      <RichText text={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
