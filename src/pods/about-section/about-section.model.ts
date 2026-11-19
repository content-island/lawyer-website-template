export interface CvItemVm {
  title: string;
  detail: string;
}

export interface CvGroupVm {
  title: string;
  items: CvItemVm[];
}

export interface AboutVm {
  id: string;
  eyebrow: string;
  /** Safe HTML */
  titleHtml: string;
  intro: string;
  body: string;
  signature: string;
  signatureMeta: string;
  /** Accessible name of the CV aside: "Education and Memberships" */
  cvLabel: string;
  cvGroups: CvGroupVm[];
}
