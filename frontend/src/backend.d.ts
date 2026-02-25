import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JobListing {
    id: string;
    applyUrl: string;
    deadline: string;
    department: string;
    position: Position;
    location: string;
    institute: string;
}
export enum Position {
    professor = "professor",
    assistantProfessor = "assistantProfessor",
    associateProfessor = "associateProfessor"
}
export interface backendInterface {
    addJob(institute: string, position: Position, department: string, location: string, deadline: string, applyUrl: string): Promise<string>;
    editJob(id: string, institute: string, position: Position, department: string, location: string, deadline: string, applyUrl: string): Promise<void>;
    filterJobsByDepartment(department: string): Promise<Array<JobListing>>;
    filterJobsByInstitute(institute: string): Promise<Array<JobListing>>;
    filterJobsByLocation(location: string): Promise<Array<JobListing>>;
    filterJobsByPosition(position: Position): Promise<Array<JobListing>>;
    getAllJobs(): Promise<Array<JobListing>>;
    init(): Promise<void>;
    removeJob(id: string): Promise<void>;
    searchJobs(searchTerm: string): Promise<Array<JobListing>>;
}
