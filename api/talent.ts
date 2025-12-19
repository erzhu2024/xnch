// xnch/api/talent.ts
export function getJobList(params: any) {
    return $request.get({ url: '/talent/jobs', params })
}

export function getTalentPool(params: any) {
    return $request.get({ url: '/talent/pool', params })
}

export function getRecruitCompanies(params: any) {
    return $request.get({ url: '/talent/recruit', params })
}
