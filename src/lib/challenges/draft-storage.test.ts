import { beforeEach, describe, expect, it } from "vitest";

import {
  clearChallengeDraft,
  draftStorageKey,
  loadChallengeDraft,
  saveChallengeDraft,
} from "@/lib/challenges/draft-storage";

describe("challenge draft storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("builds a namespaced key", () => {
    expect(draftStorageKey("c1")).toBe("webdevtraining-challenge-draft:c1");
  });

  it("loads starter code when nothing is saved", () => {
    expect(loadChallengeDraft("c1", "starter")).toBe("starter");
  });

  it("saves drafts and clears when matching starter", () => {
    saveChallengeDraft("c1", "edited", "starter");
    expect(loadChallengeDraft("c1", "starter")).toBe("edited");

    saveChallengeDraft("c1", "starter", "starter");
    expect(window.localStorage.getItem(draftStorageKey("c1"))).toBeNull();
  });

  it("clears drafts explicitly", () => {
    saveChallengeDraft("c1", "edited", "starter");
    clearChallengeDraft("c1");
    expect(loadChallengeDraft("c1", "starter")).toBe("starter");
  });
});
