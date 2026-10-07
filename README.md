# Yiwen Ding — personal website

Static academic homepage for GitHub Pages. No build step or external frontend dependencies.

- `index.html`: biography, publications, talks, education, and contact details.
- `cv.html`: standalone web CV, including all 13 research records from the homepage.
- `style.css`: shared responsive light/dark styles, keyboard focus, and print styles.
- `script.js`: theme preference (with system fallback) and footer year.
- `cv.tex`: editable LaTeX CV source.
- `Yiwen_Ding_CV.pdf`: current two-page downloadable CV; `cv.pdf` is an identical local copy.

To preview locally, run `python3 -m http.server 8000` and open `http://localhost:8000`.

## Publication sources and editorial decisions

Checked on 7 October 2026 against [Yiwen Ding's Google Scholar profile](https://scholar.google.com/citations?user=UDOWR0MAAAAJ&hl=en), including all 13 listed records and the individual Scholar records for the conference abstracts.

- Published papers, preprints, under-review manuscripts, and conference abstracts are listed separately. Existing under-review statuses are retained; Scholar alone does not establish submission status.
- The 2023 preprint of *Causal Kripke Models* is represented by its published EPTCS version. The 2025 Synthese article remains a separate publication.
- [Hybrid Logics with Moving Names](https://doi.org/10.1007/978-3-032-22626-6_2): DaLí 2025; proceedings published in 2026 (Springer).
- [Probabilistic Causal Kripke Models](https://research.vu.nl/en/publications/probabilistic-causal-kripke-models/): LORI 2025; proceedings published in 2026 (VU record).
- [Monotone Modal Logic Beyond Distributivity](https://doi.org/10.1007/978-3-031-89610-1_8): authors verified against Springer; Alexander Kurz is not listed as a coauthor.
- [Preservation and definability for the fluted fragment](https://arxiv.org/abs/2607.12970): current arXiv v2 title. Scholar still lists the v1 title, *Failure of the Los-Tarski preservation theorem for the fluted fragment*.
- [Game semantics for lattice-based modal μ-calculus](https://arxiv.org/abs/2310.13944): current title and five authors verified against arXiv.
- [Defeasible Reasoning on Concepts](https://arxiv.org/abs/2409.04887): four authors as listed on Scholar and arXiv.
- The two multi-type universal algebra records link from Scholar to TACL 2024 contributed abstracts; they are not classified as full conference papers or as works in progress.
- *Semilattice-based Modal Logics: Modal μ-Calculus and Neighborhood Semantics* was removed at the owner's request.

Talks were drawn from the existing CV; the April 2026 talk is verified in the [GALAI seminar programme](https://sites.google.com/chapman.edu/galai/previous-semesters/spring-2026). Conference authorship alone is not treated as evidence that Yiwen delivered a talk.

## CV maintenance

The CV was updated on 7 October 2026 using the verified records above. Its traditional academic typography and section structure were informed by [Qian Chen's CV](https://chenq9901-logic.github.io/CV-QianCHEN.pdf) (22 September 2026 version). Only Yiwen Ding's own records are included.

Compile `cv.tex` with `pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/yiwen-cv-build cv.tex` after creating the output directory. Inspect every rendered page, then copy the compiled PDF to both `Yiwen_Ding_CV.pdf` and `cv.pdf`. Keep the publication content in `cv.tex`, `cv.html`, and `index.html` consistent. LaTeX build logs and preview images belong in the temporary build directory.

The homepage and web CV download buttons already point to `Yiwen_Ding_CV.pdf`; the new PDF will be served after these changes are committed, pushed, and deployed.
