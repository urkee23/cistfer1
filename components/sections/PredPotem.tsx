const GALLERY = [
  {
    label: 'FASADA',
    before: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDizphR2H07KM1SE6yA3PoMLDOlQHCo_bsEjAFaHyj1xboAdYaJiU2ccWKE20i3fDF4Wc6KzqEAKKTWCJJRTGrGEbrpWl2hDF2fGFhDBOKo1gnv5m2X8eJGMRhALK6Aoj-9Z0MUaz1uK0xhCNEQrB9v6xgwp-egN3JJKXRNxN2-WPGfgMi2R7qpIttP2Z9sFKovKUiwyWtoKnpPmVNsxtChEFl-gdvnQqLdFiuSiqwq9yV_188wZXYcwZC1FZhUPjYinJ91jPyy3wMY',
    after: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDobzVpFUE-neBHYy3Gv7KLsbv03LryHNitCbqCBk7ChthJ9oCWA6L5yyFGEKomsMKW1UGPz_cmiqc0ZBf8JqBidhN404W_zUPFejf1d8uZdb1us8AkT7byF0YpyHXs2Japl1U2r6rYRLQzxV5AYBKpIYXPglmWZEar2YeRqyjCn4boHKsK8rfDwbDtGkdCaJWuPnaWjEjnr5aUm3vtbXzG-Pzhxp7Jpei0Ogvwe_wdQ3ma9vp7GktL09IE6pw5FM98BdLk2nLhiQmQ',
    filterBefore: 'grayscale contrast-150',
  },
  {
    label: 'STREŠNA KRITINA',
    before: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEXbYk7X8E6FNjG93uSs8SMNxU8G29V3hb7j-br-bwpAC7CeTM-LQYPYT_LcBPWT-SkguTXY9qs58cZNBytBa0jJJouyGIqdHDsaT5ipVxt-xQcUE3TpvjZUw-7HgzlWdlpaMSZ3ukKd8bah_iTIOkVOG17YR_z_u-2XyIMFyXkQSzMyk-IA3pX3EcysdYjnXINOG5gp1Jb0-WIkOM0CvEWqj7ouiHlTBSe4UwyenQgbBjbNl1noOO6P8BMZmJnR_YCz7gA2SBQqSz',
    after: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgfnkmRmj35iH9CWbFnMSmOPIWonp6fXYknn_L-9EAqRWcV06GIZ34mz1xBsVcZDWrokt_4CLvKR40hfkMpmB-LcshoGopyOPphffAdTimJhuXICR9hHTPxjAd5DGBSnNqFkdL5s0utqiIlN0gROW3B4b7AJUGyf-nsT9jwp0leUci4_sXQzH-kGuHg-9dFpJL1PcoSjpCYEwKBAH_8XjtKKGBffNMpIN9_7CNu6HcefnfNf_lwZ7RUOEi7iyzCeuQo3V_ZaGV9VRy',
    filterBefore: 'sepia contrast-125',
  },
  {
    label: 'TLAKOVEC',
    before: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhgqsY0BrcPo53qtZIqyvAvcBkc0Wq8K1KBDEKkTCCDh5M8XmsRH7gIsRuBpKDE38r4njvvbupw9iHc5A1xqt80DsnMAO-ZKceOdN0a0blDgG08QV1V-_O2sOeimva2Ipcxdm_cwtblEVfSqznYmsZdbHDSFi4iN7I_354y8967UF-G0H1sJmVNXc_g1dZIFSzGE01V9gVmv9IKLBd_Ixgy3BoZDG_-DYGmpXxpMBXBteHDPu3n3W6EZDpgT2lWBCNQ1BXOTrX_z5C',
    after: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHCmKYM314B5Gx5TInOqeo-8lQcmYWh0CZjl9g5mXnfI2yh7DRwCUNt5YmSDjy8MQpZwjedarVQzrmKZ7-19O7n4yLsj9p2OJ5q4H5he9i6qMy69836O8tKnGlMfDo3_4nsjtS0KM7JISKs565USm9WvSQABQmipZ7E-nEM1Yxiyxa2ydIT60z4cyjS2IgHkQPqTUzcHzcaqfDyl07vONRzOSeyF1XlRwxkgdavLe2XIec7DXOZ888kIT-Fs1mtnX3qewjLLdyQcc8',
    filterBefore: 'brightness-50',
  },
]

export default function PredPotem() {
  return (
    <section className="bg-[#1c1b1b] py-16 px-6 md:px-8 border-b border-[#404751]" id="galerija">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold text-[#9ccaff] uppercase tracking-widest block mb-2">GALERIJA</span>
          <h2 className="text-[40px] font-black text-[#e0e2e9] uppercase tracking-tighter leading-[1.05]">Pred in potem.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY.map(({ label, before, after, filterBefore }) => (
            <div key={label} className="border border-[#404751] relative bg-[#31353a] group">
              <div className="h-64 relative overflow-hidden">
                <div className="absolute inset-0 w-1/2 overflow-hidden border-r border-[#9ccaff] z-20">
                  <img
                    alt={`${label} pred`}
                    className={`w-[200%] max-w-none h-full object-cover ${filterBefore}`}
                    src={before}
                  />
                </div>
                <img
                  alt={`${label} po`}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  src={after}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#131313] border border-[#9ccaff] flex items-center justify-center z-30">
                  <span className="material-symbols-outlined text-[16px] text-[#9ccaff]">swap_horiz</span>
                </div>
              </div>
              <div className="p-2 bg-[#31353a] border-t border-[#404751] text-center">
                <span className="text-sm font-bold text-[#e0e2e9] uppercase tracking-widest">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
